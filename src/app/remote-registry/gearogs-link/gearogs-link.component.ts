import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'anc-gearogs-link',
    styleUrls: [ './gearogs-link.component.css' ],
    templateUrl: './gearogs-link.component.html'
})
export class GearogsLinkComponent {

    @Input() public gearogsSlug: string | undefined;

}
