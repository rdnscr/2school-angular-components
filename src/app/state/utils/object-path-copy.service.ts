import { merge } from './merge-helpers.service';

class ObjectPathCopyService {
    public deepCopyByObjectPath<TObj>(orig: TObj, selector: (orig: TObj) => any, props?: {}): TObj {
        let paths = this.extractPath(selector).split('.');

        if (paths.length === 1) {
            return this.mergeBy(orig, props);
        }

        let result = this.mergeBy(orig, {});
        let current: any = result;
        for (let i = 1; i < paths.length; i++) {
            let next = current[paths[i]];

            if (this.isLastItem(paths, i)) {
                current[paths[i]] = this.mergeBy(selector(orig), props);
            } else {
                current[paths[i]] = this.mergeBy(next, {});
            }
        }

        return result;
    }

    private mergeBy(toCopy: any, props: {}): any {
        let result: any;
        if (toCopy) {
            result = merge(toCopy, props);
        } else {
            result = merge({}, props);
        }

        return result;
    }

    private extractPath<TObj>(selector: (orig: TObj) => void): string {
        return selector.toString().split('return')[1].split(';')[0].split('{')[0].trim();
    }

    private isLastItem(paths: string[], i: number): boolean {
        return paths.length - 1 === i;
    }
}

export let pathCopyHelper = new ObjectPathCopyService();
