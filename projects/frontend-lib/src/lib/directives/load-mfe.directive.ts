import { loadRemoteModule } from '@angular-architects/native-federation';
import { Directive, ViewContainerRef, OnInit, input } from '@angular/core';

@Directive({
  selector: '[loadMfe]',
  standalone: true,
})
export class MicrofrontendLoaderDirective implements OnInit {
  remoteUrl = input.required<string>();
  exposedArtefact = input.required<string>();
  exposedModule = input.required<string>();

  constructor(private viewContainerRef: ViewContainerRef) {}

  async ngOnInit() {
    try {
      const module = await loadRemoteModule({
        remoteEntry: this.remoteUrl(),
        exposedModule: this.exposedModule()
      });

      const component = module[this.exposedArtefact()];

      if (!component) {
        throw new Error(`Component ${this.exposedArtefact()} not found in remote module`);
      }

      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(component);
    } catch (error) {
      console.error('Error loading microfrontend:', error);
      this.viewContainerRef.clear();
    }
  }
}