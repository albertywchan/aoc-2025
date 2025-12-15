<!-- AOC TILES BEGIN -->
<h1 align="center">
  2025 - 24 ⭐ - TypeScript
</h1>
<a href="day_01/index.ts">
  <img src=".aoc_tiles/tiles/2025/01.gif" width="203px">
</a>
<a href="day_02/index.ts">
  <img src=".aoc_tiles/tiles/2025/02.gif" width="203px">
</a>
<a href="day_03/index.ts">
  <img src=".aoc_tiles/tiles/2025/03.gif" width="203px">
</a>
<a href="day_04/index.ts">
  <img src=".aoc_tiles/tiles/2025/04.gif" width="203px">
</a>
<a href="day_05/index.ts">
  <img src=".aoc_tiles/tiles/2025/05.gif" width="203px">
</a>
<a href="day_06/index.ts">
  <img src=".aoc_tiles/tiles/2025/06.gif" width="203px">
</a>
<a href="day_07/index.ts">
  <img src=".aoc_tiles/tiles/2025/07.gif" width="203px">
</a>
<a href="day_08/index.ts">
  <img src=".aoc_tiles/tiles/2025/08.gif" width="203px">
</a>
<a href="day_09/index.ts">
  <img src=".aoc_tiles/tiles/2025/09.gif" width="203px">
</a>
<a href="day_10/index.ts">
  <img src=".aoc_tiles/tiles/2025/10.gif" width="203px">
</a>
<a href="day_11/index.ts">
  <img src=".aoc_tiles/tiles/2025/11.gif" width="203px">
</a>
<a href="day_12/index.ts">
  <img src=".aoc_tiles/tiles/2025/12.gif" width="203px">
</a>
<!-- AOC TILES END -->

<h1 align="center">
  Takeaways
</h1>
<ul>
<li>Did not solve AoC daily unlike last year</li>
<li>Completed all 12 days over the course of 4 days</li>
<li>Spent a lot of time solving Day 1 Part 2 😅</li>
<li>Needed hints to solve most of the days</li>
<li>Had to read others' solutions to understand the greedy algorithm required for Day 3 Part 2</li>
<li>Relearned greedy clustering algorithm for Day 8 (tbt to CPSC 320)</li>
<li>Felt fairly confident implementing BFS, DFS, backtracking to solve a number of different problems</li>
<li>Having previously solved "Merge Intervals" on LC was very helpful for Day 5</li>
<li>Familiarized myself with JavaScript's array methods and all its other quirks (there's no built-in heap data structure?!?)</li>
<li>Played around with a bunch of different packages e.g., jsts, GLPK (note: z3-solver does not work with Bun)</li>
<li>Realized there's still a lot to learn about TypeScript despite using it on-the-job everyday</li>
<li>Learned a number of different ways to write code that complies with Biome</li>
<li>Enjoyed using Bun and leveraging all its features</li>
<li>Proud that I was able to complete another AoC albeit shorter this year</li>
<li>Will attempt to solve AoC again next year using a new language</li>
</ul>

---

To install dependencies:

```bash
bun install
```

To configure environment variables:
```bash
cp .env.example .env
```

To run:

```bash
# Run a specific day (e.g., day 3)
bun run day 3

# Run all days
bun run all

# Create a new day folder (e.g., day_05)
bun run create 5
```

This project was created using `bun init` in bun v1.3.3. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
