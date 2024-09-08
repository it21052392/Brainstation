const lectures = [
  {
    id: 1,
    title: "Introduction to Data Structures",
    slides: [
      {
        id: 1,
        title: "Comprehensive Guide to Data Structures and Algorithms",
        content: `
            <p>Welcome to the CS Text Compendium, an expansive resource designed to offer a comprehensive understanding of Data Structures and Algorithms. Delve into the intricate world of computational concepts essential to mastering computer science.</p>
            <p><br></p>
            <p>Within these pages, you'll immerse yourself in,</p>
            <p><br></p>
            <ul>
                <li><strong>Fundamental Structures:</strong> Arrays, Linked Lists, Stacks, and Queues.</li>
                <li><strong>Hierarchical Models:</strong> Trees, Binary Trees, and Graphs.</li>
                <li><strong>Algorithmic Efficiency:</strong> Big O Notation, Sorting, and Searching.</li>
            </ul>
            <p><br></p>
            <p>Embark on a journey of exploration and discovery as you uncover the principles and practices that drive computational problem-solving. Let the CS Text Compendium be your trusted companion in your pursuit of CS excellence.</p>
          `
      },
      {
        id: 2,
        title: "Introduction to Arrays",
        content: `
            <p>Arrays are the simplest form of data structures. They allow you to store a fixed-size sequential collection of elements of the same type.</p>
            <ul>
                <li><strong>Definition:</strong> An array is a collection of items stored at contiguous memory locations.</li>
                <li><strong>Types:</strong> Single-dimensional, Multi-dimensional, Jagged arrays.</li>
                <li><strong>Operations:</strong> Traversal, Insertion, Deletion, Searching, Sorting.</li>
            </ul>
          `
      }
    ]
  },
  {
    id: 2,
    title: "Advanced Data Structures",
    slides: [
      {
        id: 1,
        title: "Understanding Trees",
        content: `
            <p>Trees are a type of data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.</p>
            <ul>
                <li><strong>Types of Trees:</strong> Binary Trees, AVL Trees, B-Trees, Red-Black Trees.</li>
                <li><strong>Operations:</strong> Insertion, Deletion, Traversal (Preorder, Inorder, Postorder).</li>
            </ul>
          `
      },
      {
        id: 2,
        title: "Graph Theory Basics",
        content: `
            <p>Graphs are a versatile data structure that can represent various systems in the real world such as networks, paths in a city, etc.</p>
            <ul>
                <li><strong>Components:</strong> Vertices (nodes), Edges (links).</li>
                <li><strong>Types of Graphs:</strong> Directed, Undirected, Weighted, Unweighted.</li>
                <li><strong>Graph Traversal:</strong> Depth First Search (DFS), Breadth First Search (BFS).</li>
            </ul>
          `
      }
    ]
  },
  {
    id: 3,
    title: "Sorting Algorithms",
    slides: [
      {
        id: 1,
        title: "Introduction to Sorting Algorithms",
        content: `
          <p>Sorting algorithms are essential for organizing data in a specific order, typically ascending or descending.</p>
          <ul>
            <li><strong>Types of Sorting:</strong> Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.</li>
            <li><strong>Use Cases:</strong> Data retrieval, optimization, and searching algorithms.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 4,
    title: "Hashing",
    slides: [
      {
        id: 1,
        title: "Understanding Hashing",
        content: `
          <p>Hashing is a technique used to uniquely identify a specific object from a group of similar objects.</p>
          <ul>
            <li><strong>Hash Functions:</strong> Converts an input (or 'key') into a fixed-size string of bytes.</li>
            <li><strong>Applications:</strong> Data storage, password verification, and indexing.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 5,
    title: "Recursion",
    slides: [
      {
        id: 1,
        title: "Introduction to Recursion",
        content: `
          <p>Recursion is a method of solving a problem where the solution depends on solutions to smaller instances of the same problem.</p>
          <ul>
            <li><strong>Key Concepts:</strong> Base case, recursive case, stack overflow.</li>
            <li><strong>Examples:</strong> Factorial, Fibonacci sequence, Tower of Hanoi.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 6,
    title: "Dynamic Programming",
    slides: [
      {
        id: 1,
        title: "Fundamentals of Dynamic Programming",
        content: `
          <p>Dynamic programming is an optimization technique used to solve complex problems by breaking them down into simpler subproblems.</p>
          <ul>
            <li><strong>Principles:</strong> Overlapping subproblems, optimal substructure.</li>
            <li><strong>Applications:</strong> Knapsack problem, Fibonacci sequence, matrix chain multiplication.</li>
          </ul>
        `
      }
    ]
  },
  {
    id: 7,
    title: "Graph Algorithms",
    slides: [
      {
        id: 1,
        title: "Introduction to Graph Algorithms",
        content: `
          <p>Graph algorithms are a set of instructions that traverse (visit nodes) or modify graphs (add/remove edges or vertices).</p>
          <ul>
            <li><strong>Types:</strong> Depth-First Search (DFS), Breadth-First Search (BFS), Dijkstra's Algorithm, Kruskal's Algorithm.</li>
            <li><strong>Applications:</strong> Network routing, social networks, mapping applications.</li>
          </ul>
        `
      }
    ]
  }
];

export default lectures;
