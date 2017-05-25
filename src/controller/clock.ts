import { inject, injectable } from "inversify";

import { IClock, IControllerSettings, INJECTABLES } from "./types";

@injectable()
export class Clock implements IClock {

    @inject(INJECTABLES.ControllerSettings)
    private settings: IControllerSettings;

    public get currentSlot(): number {
        const now: Date = new Date();
        const minutesElapsed: number = now.getHours() * 60 + now.getMinutes();

        return Math.floor(minutesElapsed / this.minutesPerSlot());
    }

    private minutesPerSlot(): number {
        return (24 * 60) / this.settings.slotsPerDay;
    }

}
