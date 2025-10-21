import { Component, signal, effect, computed, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { NameColorDirective } from './name-color.directive'; // New Directive

// Define a richer interface for our "names"
interface Character {
  name: 'Eeepy Car' | 'Wakey Wakey Car' | 'Eeepy Duckling' | 'Wakey Wakey Rabbit';
  emoji: string;
  themeClass: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, NameColorDirective, NgClass],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  // Define all possible characters
  private characters: Character[] = [
    { name: 'Eeepy Car', emoji:'😸🌃' , themeClass: 'theme-sleepy-car', caption: 'Eeeping right now...' },
    { name: 'Wakey Wakey Car', emoji: '😼😗', themeClass: 'theme-wakey-car', caption:'' },
    { name: 'Eeepy Duckling', emoji: '🥱🦆', themeClass: 'theme-sleepy-duck', caption: 'Just needs five more minutes.' },
    { name: 'Wakey Wakey Rabbit', emoji: '🥕🐇', themeClass: 'theme-bouncing-rabbit', caption: 'Full of spring energy!' },
  ] as const;

  // Signal to hold the current character
  currentName = signal<Character>(this.characters[0]);

  // Signal to control the "guess" button's loading/active state
  isGuessing = signal(false);

  // Computed signal for the dynamic background class
  bgColor = computed(() => {
    return this.currentName().themeClass;
  });

  // Effect to log the name change and trigger a temporary animation/vibration
  nameChangeEffect = effect(() => {
    console.log(`🌀 Character revealed: ${this.currentName().name}`);
    // You could trigger a service call or a more complex UI animation here
  });

  ngOnInit(): void {
    // Optional: Add some initial setup logic
  }

  // --- Core Logic ---

  changeName() {
    this.isGuessing.set(true); // Start "loading" animation

    // Simulate a guessing/loading delay for a better UX effect
    setTimeout(() => {
      const currentIndex = this.characters.findIndex(c => c.name === this.currentName().name);

      // Get a new random index, ensuring it's not the same as the current one
      let newIndex: number;
      do {
        newIndex = Math.floor(Math.random() * this.characters.length);
      } while (newIndex === currentIndex);

      this.currentName.set(this.characters[newIndex]);
      this.isGuessing.set(false); // Stop "loading" animation
    }, 800); // 800ms delay
  }

  // Getters for template access
  getName() {
    return this.currentName().name;
  }

  getNameEmoji() {
    return this.currentName().emoji;
  }

  getNameCaption() {
    return this.currentName().caption;
  }
}
