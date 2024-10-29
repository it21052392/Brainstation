import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DialogBox from "@/components/common/dialogBox";
import ScrollView from "@/components/common/scrollable-view";
import { getLectureById, updateLecture } from "@/service/lecture";
import module from "@/utils/quillTextModules";

const SlideEditor = () => {
  const { lectureId } = useParams();
  const [slides, setSlides] = useState([]);
  const [originalSlides, setOriginalSlides] = useState([]); // Store original slides for comparison
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const [slideTitle, setSlideTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const fetchLecture = async () => {
      const response = await getLectureById(lectureId);
      const lectureSlides = response.data.slides;
      setSlides(lectureSlides);
      setOriginalSlides(lectureSlides); // Store original slides for change detection
      if (lectureSlides.length > 0) {
        setSelectedSlide(lectureSlides[0]);
        setEditorContent(lectureSlides[0].content);
        setSlideTitle(lectureSlides[0].title);
        setOriginalContent(lectureSlides[0].content);
      }
    };
    fetchLecture();
  }, [lectureId]);

  const generateObjectId = () => {
    return (
      Math.floor(Date.now() / 1000).toString(16) +
      "xxxxxxxxxxxxxxxx".replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
    );
  };

  const handleSlideSelect = (slide) => {
    setSelectedSlide(slide);
    setEditorContent(slide.content);
    setSlideTitle(slide.title);
    setOriginalContent(slide.content);
  };

  const handleTitleChange = (e) => {
    setSlideTitle(e.target.value);
  };

  const handleSave = () => {
    setSlides((prevSlides) =>
      prevSlides.map((slide) =>
        slide._id === selectedSlide._id ? { ...slide, content: editorContent, title: slideTitle } : slide
      )
    );
    setOriginalContent(editorContent);
  };

  const hasChanges = () => {
    if (slides.length !== originalSlides.length) return true;
    return slides.some(
      (slide, index) => slide.content !== originalSlides[index].content || slide.title !== originalSlides[index].title
    );
  };

  const handleSaveAllSlides = async () => {
    if (!hasChanges()) {
      toast.info("No changes detected to save.");
      return;
    }
    try {
      const updatedLecture = {
        slides: slides.map((slide) => ({
          id: slide.id,
          title: slide.title,
          content: slide.content,
          _id: slide._id
        }))
      };
      await updateLecture(lectureId, updatedLecture);
      toast.success("All slides have been saved successfully.");
      setOriginalSlides([...slides]);
      // Update original slides to reflect saved state
    } catch (error) {
      toast.error("Failed to save slides.");
    }
  };

  const handleReset = () => {
    setEditorContent(originalContent);
    setSlideTitle(selectedSlide.title);
  };

  const handleAddSlide = () => {
    const newId = slides.length > 0 ? slides[slides.length - 1].id + 1 : 1;
    const newSlide = {
      id: newId,
      _id: generateObjectId(),
      title: `Slide ${newId}`,
      content: "Enter slide content here..."
    };
    setSlides((prevSlides) => [...prevSlides, newSlide]);
    handleSlideSelect(newSlide);
  };

  const handleRemoveSlide = () => {
    if (selectedSlide) {
      setSlides((prevSlides) => {
        const updatedSlides = prevSlides.filter((slide) => slide._id !== selectedSlide._id);
        if (updatedSlides.length > 0) {
          setSelectedSlide(updatedSlides[0]);
          setEditorContent(updatedSlides[0].content);
          setSlideTitle(updatedSlides[0].title);
          setOriginalContent(updatedSlides[0].content);
        } else {
          setSelectedSlide(null);
          setEditorContent("");
          setSlideTitle("");
        }
        return updatedSlides;
      });
    }
  };

  const showConfirmation = (action) => {
    setPendingAction(action);
    setDialogVisible(true);
  };

  const handleDialogConfirm = () => {
    setDialogVisible(false);
    switch (pendingAction) {
      case "saveAllSlides":
        handleSaveAllSlides();
        break;
      case "saveSlide":
        handleSave();
        break;
      case "resetSlide":
        handleReset();
        break;
      case "deleteSlide":
        handleRemoveSlide();
        break;
      default:
        break;
    }
    setPendingAction(null);
  };

  const handleDialogCancel = () => {
    setDialogVisible(false);
    setPendingAction(null);
  };

  return (
    <div className="p-4 px-6">
      <DialogBox
        isVisible={dialogVisible}
        title="Confirmation"
        message={`Are you sure you want to ${
          pendingAction === "deleteSlide"
            ? "delete this slide"
            : pendingAction === "resetSlide"
              ? "reset the content of this slide"
              : "proceed"
        }?`}
        onOkay={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />

      <div className="flex">
        <div className="w-1/4">
          <div className="p-4 bg-gray-100 border-r border-gray-300">
            <h2 className="text-xl font-semibold mb-4">Lecture Slides</h2>
            <div className="flex gap-4 mt-4 py-2">
              <button
                onClick={handleAddSlide}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Add Slide
              </button>
              <button
                onClick={() => {
                  showConfirmation("saveAllSlides");
                }}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Save All Slides
              </button>
            </div>
            <hr />
          </div>
          <ScrollView initialMaxHeight="12rem">
            <div className="p-4 bg-gray-100 border-r border-gray-300 h-full">
              <ul className="space-y-3 pb-20">
                {slides.map((slide) => (
                  <li
                    key={slide._id}
                    className={`p-4 bg-white shadow-md rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg ${
                      selectedSlide?._id === slide._id ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleSlideSelect(slide)}
                  >
                    {slide.title}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollView>
        </div>

        <div className="w-3/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Edit Slide Content</h2>
          <input
            type="text"
            value={slideTitle}
            onChange={handleTitleChange}
            placeholder="Edit slide title here..."
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
          <ScrollView initialMaxHeight="12rem">
            <ReactQuill
              theme="snow"
              modules={module}
              value={editorContent}
              onChange={setEditorContent}
              className="w-full h-[70%] p-4 border border-gray-300 rounded-lg"
            />
            <div className="flex gap-4 mt-4 pb-20">
              <button
                onClick={() => showConfirmation("resetSlide")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Reset
              </button>
              <button
                onClick={() => showConfirmation("saveSlide")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => showConfirmation("deleteSlide")}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Delete Slide
              </button>
            </div>
          </ScrollView>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
