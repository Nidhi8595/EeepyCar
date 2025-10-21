import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appNameColor]', // The selector used in the HTML
  standalone: true,
})
export class NameColorDirective implements OnChanges {
  // Input property to receive the current theme class
  @Input('appNameColor') themeClass: string = '';

  constructor(private el: ElementRef) {}

 // inside name-color.directive.ts ngOnChanges()
ngOnChanges() {
  let textColorClass = 'text-white'; // Default to white for the dark card background

  // Determine a complementary text color based on the theme
  // We're now setting a contrasting highlight color, not the main color.
  switch (this.themeClass) {
    case 'theme-sleepy-car':
      // The background is usually dark gray (e.g., bg-gray-500), so a light color is needed.
      textColorClass = 'text-gray-600'; // Subtle light gray
      break;
    case 'theme-wakey-car':
      // The background is a bright blue (e.g., bg-blue-400), but the card is dark.
      textColorClass = 'text-indigo-400'; // Light blue/indigo highlight
      break;
    case 'theme-sleepy-duck':
      // The background is yellow (e.g., bg-yellow-300).
      textColorClass = 'text-yellow-300'; // Very light yellow
      break;
    case 'theme-bouncing-rabbit':
      // The background is purple (e.g., bg-purple-400).
      textColorClass = 'text-pink-400'; // Light pink/fuchsia highlight
      break;
      // Add other cases as needed
  }

  // ... rest of the original logic to apply the class ...
  this.el.nativeElement.className = this.el.nativeElement.className
    .split(' ')
    .filter((c: string) => !c.startsWith('text-'))
    .join(' ');

  this.el.nativeElement.classList.add(textColorClass);
}
}
