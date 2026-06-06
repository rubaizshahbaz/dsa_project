# 🧩 DSA Visualizer

A simple, **beginner-friendly** web project that lets you *see* how common Data
Structures and Algorithms work. Insert, delete, search and watch every step
animate in your browser.

Built with only **HTML, CSS and plain JavaScript** — no frameworks, no build
tools. Just open it in a browser. Perfect for a college / first-year project.

---

## ✨ What's inside

| Topic | What you can do |
|-------|-----------------|
| 🔗 **Linked List** | Insert at head / tail / position, delete, search, clear |
| 📚 **Stack (LIFO)** | Push, pop, peek |
| 🚶 **Queue (FIFO)** | Enqueue, dequeue, peek |
| 🌳 **Binary Search Tree** | Insert, delete, search, inorder traversal |
| 🕸️ **Graph** | Add nodes & edges, BFS and DFS traversal |
| 📊 **Sorting** | Bubble, Selection and Insertion sort animations |
| 🔍 **Searching** | Linear search and Binary search step by step |

Every operation is **visualized**: nodes pop in, bars change colour while being
compared/swapped, and search paths light up so you can follow the logic.

---

## 🚀 How to run it

### Option 1 — Just open the file
Download or clone the project, then double-click **`index.html`**. That's it!

### Option 2 — Local server (recommended)
```bash
# inside the project folder
python3 -m http.server 8000
```
Then open <http://localhost:8000> in your browser.

### Option 3 — GitHub Pages (live website)
1. Push this project to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**.
4. Pick your branch and the `/ (root)` folder, then **Save**.
5. After a minute your site is live at
   `https://<your-username>.github.io/<repo-name>/`

---

## 📁 Project structure

```
dsa_project/
├── index.html          # Home page with links to every topic
├── css/
│   └── style.css       # All the styling (shared by every page)
├── js/
│   ├── linkedlist.js
│   ├── stack.js
│   ├── queue.js
│   ├── tree.js
│   ├── graph.js
│   ├── sorting.js
│   └── searching.js
└── pages/
    ├── linkedlist.html
    ├── stack.html
    ├── queue.html
    ├── tree.html
    ├── graph.html
    ├── sorting.html
    └── searching.html
```

---

## 🎨 Colour guide (used in the animations)

- **Purple** – normal / unsorted element
- **Orange** – element currently being compared or visited
- **Red** – elements being swapped
- **Green** – element that is sorted / found

---

## 🧠 Concepts you'll learn

- How a **linked list** chains nodes together with pointers.
- Why a **stack** is *Last In, First Out* and a **queue** is *First In, First Out*.
- How a **Binary Search Tree** keeps data sorted (left = smaller, right = larger).
- How **BFS** (uses a queue) and **DFS** (uses a stack/recursion) explore a graph.
- The difference between simple **sorting** algorithms.
- Why **binary search** is so much faster than **linear search** on sorted data.

---

Made for learning. Open `index.html` and start exploring! 🎓
