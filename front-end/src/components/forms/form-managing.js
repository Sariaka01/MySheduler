export function clearInputs(...refs) {
    for (let ref of refs) {
        if (ref)
            ref.current.value = ''
    }
}