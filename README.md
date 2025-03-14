# Todo-App

This is a simple Todo App built using React, Zustand (State Management), and LocalStorage.

**Features** 🚀

✅ Add a new todo

❌ Remove a todo

🔄 Mark a todo as completed (checkbox)

💾 Saves todos even after refreshing the page (LocalStorage)

**How It Works?** 🤔

1️⃣ **Adding a Todo**

When you type a task and click "Add Todo," it gets added to the list.

Each todo has:

Text (What you typed)

Completed status (Default is false)

Unique ID

Todos are stored in localStorage, so they don’t disappear on refresh.

2️⃣ **Removing a Todo**

When you click the Delete button, that specific todo is removed.

It also updates localStorage so that it doesn’t come back after refresh.

3️⃣ **Marking Todo as Completed**

Clicking the checkbox will toggle the todo’s status between completed ✅ and not completed ❌.

A completed todo will have a line-through.

This change is saved in localStorage, so it remains even after refresh.

**How is Data Saved?** 💾

All todos are stored in localStorage.

Whenever you add, remove, or toggle a todo, it updates localStorage.

When the app loads, it fetches data from localStorage so that old todos don’t disappear.

**Technologies Used** 🛠️

React (for UI)

Zustand (for state management)

LocalStorage (to save todos even after refresh)

Framer Motion (for smooth animations)

**How to Run the Project** 🏃‍♂️

Clone the repo

Run npm install

Run npm start

Enjoy your Todo App! 🎉
