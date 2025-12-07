import { Project, Category } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Resume & Bio',
    category: Category.RESUME,
    description: 'Experience, Skills, and Toolset.',
    date: '2024',
    tags: ['Unity', 'Unreal', 'C#', 'Excel'],
    color: 'border-yellow-400',
    content: `
      <h3 class="text-2xl font-bold mb-4 font-pixel">Profile</h3>
      <p class="mb-4">Passionate Game Designer with 3+ years of experience in system design and combat balancing. I bridge the gap between creative vision and technical implementation.</p>
      
      <h3 class="text-2xl font-bold mb-4 font-pixel mt-6">Experience</h3>
      <div class="mb-4">
        <div class="flex justify-between font-bold">
          <span>Senior System Designer</span>
          <span class="text-slate-400">2022 - Present</span>
        </div>
        <p class="text-sm text-slate-300">Indie Studio X</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-200">
          <li>Designed and balanced the core economy system for a simulation RPG.</li>
          <li>Led a team of 3 junior designers.</li>
        </ul>
      </div>

      <div class="mb-4">
        <div class="flex justify-between font-bold">
          <span>Level Designer</span>
          <span class="text-slate-400">2020 - 2022</span>
        </div>
        <p class="text-sm text-slate-300">Mobile Games Corp</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-200">
          <li>Created 50+ levels for a match-3 puzzle game with unique mechanics.</li>
          <li>Optimized level flow based on user retention data.</li>
        </ul>
      </div>
    `,
    image: 'https://picsum.photos/400/400'
  },
  {
    id: '2',
    title: 'Project: Starfall',
    category: Category.GDD,
    description: 'A rogue-lite action platformer with time-manipulation mechanics.',
    date: 'Oct 2023',
    tags: ['Combat Design', 'Mechanics'],
    color: 'border-cyan-400',
    content: `
      <h3 class="text-2xl font-bold mb-4 font-pixel">Core Loop</h3>
      <p class="mb-4">Players traverse procedurally generated celestial ruins. The unique hook is the "Chronos Shift" ability, allowing players to revert object states by 3 seconds.</p>
      
      <h3 class="text-2xl font-bold mb-4 font-pixel mt-6">Combat Pillars</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Fluidity:</strong> Animation cancelling is encouraged.</li>
        <li><strong>Precision:</strong> Hitboxes are pixel-perfect; parry windows are tight (0.2s).</li>
        <li><strong>Adaptability:</strong> Enemies evolve based on player weapon choice.</li>
      </ul>
      
      <div class="my-6 p-4 border-2 border-dashed border-cyan-500/30 bg-cyan-900/20 rounded">
        <p class="text-xs uppercase tracking-widest mb-2 text-cyan-400">Designer Note</p>
        <p class="italic">The main challenge was preventing the time-rewind mechanic from trivializing platforming puzzles. We solved this by adding "Entropy Zones" where magic doesn't work.</p>
      </div>
    `,
    image: 'https://picsum.photos/401/401'
  },
  {
    id: '3',
    title: 'Economy Analysis',
    category: Category.ANALYSIS,
    description: 'Deconstruction of the economy in "Genshin Impact".',
    date: 'Jan 2024',
    tags: ['Monetization', 'F2P'],
    color: 'border-emerald-400',
    content: `
      <h3 class="text-2xl font-bold mb-4 font-pixel">Resource Sinks & Faucets</h3>
      <p class="mb-4">An in-depth look at how Resin gates progression without hard-locking exploration.</p>
      
      <table class="w-full border-collapse border border-slate-500 mb-6 text-sm">
        <thead>
          <tr class="bg-slate-800">
            <th class="border border-slate-600 p-2">Resource</th>
            <th class="border border-slate-600 p-2">Source (Faucet)</th>
            <th class="border border-slate-600 p-2">Sink</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-600 p-2">Mora</td>
            <td class="border border-slate-600 p-2">Daily Commisions, Ley Lines</td>
            <td class="border border-slate-600 p-2">Leveling, Talents, Artifacts</td>
          </tr>
          <tr>
            <td class="border border-slate-600 p-2">Primogems</td>
            <td class="border border-slate-600 p-2">Events, Abyss, Chests</td>
            <td class="border border-slate-600 p-2">Gacha Banners</td>
          </tr>
        </tbody>
      </table>
    `,
    image: 'https://picsum.photos/402/402'
  },
  {
    id: '4',
    title: 'Neon Harvest',
    category: Category.SYSTEM,
    description: 'Farming sim mechanics in a cyberpunk setting.',
    date: 'Aug 2023',
    tags: ['Systems', 'UI UX'],
    color: 'border-pink-500',
    content: `
      <h3 class="text-2xl font-bold mb-4 font-pixel">Hydroponics Logic</h3>
      <p>Plants require specific nutrient mixes (N-P-K values) rather than just water. Players must mix chemical solutions.</p>
    `,
    image: 'https://picsum.photos/403/403'
  },
  {
    id: '5',
    title: 'Dungeon 101',
    category: Category.LEVEL,
    description: 'Paper prototype for a zelda-like dungeon.',
    date: 'Mar 2023',
    tags: ['Layout', 'Pacing'],
    color: 'border-orange-400',
    content: `
      <h3 class="text-2xl font-bold mb-4 font-pixel">The Lock & Key Structure</h3>
      <p>This dungeon utilizes a hub-and-spoke design.</p>
    `,
    image: 'https://picsum.photos/404/404'
  },
];