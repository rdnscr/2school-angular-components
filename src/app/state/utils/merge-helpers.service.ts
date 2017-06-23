export let merge = (orig: any, props: any) => {
    return Object.assign({}, orig, props);
};

export let cloneArray = (origArray: any[]) => {
    let newArray = [];
    for (let element of origArray) {
        if (element) {
            newArray.push(merge({}, element));
        }
    }

    return newArray;
};
