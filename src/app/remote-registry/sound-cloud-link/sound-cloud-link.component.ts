import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'anc-sound-cloud-link',
    standalone: false,
    templateUrl: './sound-cloud-link.component.html'
})
export class SoundCloudLinkComponent {
    @Input() public soundCloudUsername: string | undefined;
}
