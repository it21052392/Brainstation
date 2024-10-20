import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const ontologyFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lecture',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ontologyFileSchema.plugin(aggregatePaginate);
ontologyFileSchema.index({ createdAt: 1 });

export const OntologyFile = mongoose.model('OntologyFile', ontologyFileSchema);

OntologyFile.syncIndexes();

export default OntologyFile;
