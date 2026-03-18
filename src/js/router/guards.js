
export const guards = {

    guards: {},

    addGuard(event, callback) {
        if(!this.guards[event]) this.guards[event] = [];
        this.guards[event].push(callback);
    },

    // TODO remove guard
    

    runGuards(event, to, from) {
        for (const guard of this.guards[event] || []) {
            const result = this.executeGuard(guard, to, from);
            
            // If guard returns false or redirect, stop execution
            if (result !== true) {
                // TODO add navigate cancel event
                return result;
            }
        }
        
        return true; // All guards passed
    },


    // Execute single guard with next() callback
    executeGuard(guard, to, from) {
        const next = (value = true) => {
            return value;
        };

        return guard(to, from, next);
    },




}