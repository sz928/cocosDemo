export class EventManager {
    private static _ins: EventManager;
    static get ins(): EventManager {
        if (!this._ins) {
            this._ins = new EventManager();
        }
        return this._ins;
    }

    private calls: Map<string, { type: string, callback: Function, target: any }[]> = new Map();

    on(type: string, callback: Function, target: any) {
        let calls = this.calls.get(type);
        if (calls) {
            for (let i = 0; i < calls.length; i++) {
                const call = calls[i];
                if (call.target == target && call.callback == callback) {
                    return;
                }
            }
        } else {
            let data = { type: type, callback: callback, target: target };
            calls ? calls.push(data) : this.calls.set(type, [data]);
        }

    }

    off(type: string, callback: Function, target: any) {
        let calls = this.calls.get(type);
        if (!calls) return;
        for (let i = 0; i < calls.length; i++) {
            const call = calls[i];
            if (call.callback == callback && call.target == target) {
                calls.splice(i, 1);
                if (calls.length <= 0) this.calls.delete(type);
                break;
            }

        }
    }

    dispatchEvent(type: string, args?: any) {
        let calls = this.calls.get(type);
        if (!calls) return;
        for (let i = 0; i < calls.length; i++) {
            const call = calls[i];
            call.callback.call(call.target, args);
        }
    }
}