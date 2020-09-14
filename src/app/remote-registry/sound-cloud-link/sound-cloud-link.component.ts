import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'anc-sound-cloud-link',
    styleUrls: ['./sound-cloud-link.component.css'],
    templateUrl: './sound-cloud-link.component.html'
})
export class SoundCloudLinkComponent {
    @Input() public soundCloudUsername: string | undefined;
}
