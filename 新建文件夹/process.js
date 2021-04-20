"use strict";
const process = async (steps) => {
    for (const step of steps) {
        await step();
    }
};
const subProcess = () => process([
    () => Promise.resolve().then(() => console.log(1)),
    () => Promise.resolve().then(() => console.log(2)),
]);
process([
    () => Promise.resolve().then(() => console.log(1)),
    () => Promise.resolve().then(() => console.log(2)),
    () => Promise.reject()
        .then(() => console.log(3))
        .catch(() => console.log('err1')),
    subProcess,
    () => Promise.reject()
        .then(() => console.log(4))
        .catch(() => {
        console.log('err2');
        throw 'err2';
    }),
    () => Promise.resolve().then(() => console.log(5)),
]).catch((err) => {
    console.log(err);
});
