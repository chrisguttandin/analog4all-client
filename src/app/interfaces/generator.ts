export interface IGenerator {
    created: number;

    id: string;

    instrument: {
        id: string;
    };

    modified: number;

    socket: {
        url: string;
    };
}
