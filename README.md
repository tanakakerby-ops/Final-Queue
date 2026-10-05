# QueueEase (simple version: no database, no parameters)

## What "no parameters" means
A **parameter** is a value you put inside the brackets of a function, like `formatNumber(n)`.
In this version, **none of our own functions has anything inside its brackets**: `loadQueue()`, `callNext()`, `showQueue()` ...

Instead, `script.js` has two **shared lists** (variables) that every function can see:
- `queue` = everybody who booked
- `line` = the people who are waiting, in the right order (priority first)

How the functions work together:
1. `loadQueue()` fills the shared list `queue` from the saved data.
2. `makeLine()` fills the shared list `line` from `queue`.
3. `findServing()` and `findNextWaiting()` look inside those shared lists.
4. `saveQueue()` saves `queue` again after we change something.

Note: commands that come with JavaScript still need values in brackets, like `alert("hello")` or `document.getElementById("name")`. That is normal. It means "use this command with this text". We just do not create our own functions with parameters.

## How to run
1. Unzip the folder.
2. Install VS Code + the **Live Server** extension, right-click `index.html` -> **Open with Live Server**. (Or double-click `index.html`.)
3. Use ONE browser, normal window (not incognito). Open **Book**, **Queue** and **Staff** in separate tabs.

## The 6 pages
| Page | What it does |
|---|---|
| Home | Banner slider |
| Services | Slider of services |
| Book | Form with a range slider (number of people) and a priority checkbox. Gives a queue ticket |
| Queue | Big "Now Serving" number, and the next people in boxes (4 per row). Updates every 2 seconds |
| Staff | Call Next, Finish Current, Clear All, table of everyone |
| About | About the system and the team (edit the member names!) |

## Demo script (2 minutes)
1. On **Staff**, press **Clear All**.
2. On **Book**, book "Ana" (regular), then "Ben" (regular), then "Cara" and tick **Priority lane**.
3. Open **Queue**: Cara is first (red box), then Ana, then Ben.
4. On **Staff**, press **Call Next**. Cara becomes "Now Serving". Press it again: Ana.
5. Switch to the **Queue** tab: the big number changed by itself.

## What to say in your defense
"The queue is a list of people. Each person has a status: waiting, then serving, then done. The Book page adds a person to the list. The Staff page changes the status. The Queue page reads the list and draws it every 2 seconds. Priority people are placed before regular people. The list is saved in the browser using localStorage. To keep the code simple, our functions use shared lists instead of parameters."

## Be honest about the limits
- **No database:** the queue lives in ONE browser. Another phone or computer has its own empty queue. For the demo, use one laptop (put the Queue tab on the projector).
- No staff PIN.
- Wait time is an estimate (10 minutes per person).
- The slider dots only show which slide you are on (use the arrows to move).
- Future improvement: a database so all devices share one queue, plus a staff login. Later, once you learn parameters, functions can take values in their brackets instead of using shared lists.

## Where is the code?
- `script.js`: the shared logic. Every line has a comment. Start here.
- `book.html`, `queue.html`, `staff.html`: a short script at the bottom of each page.
- `style.css`: colors and layout only (not important to memorize).
