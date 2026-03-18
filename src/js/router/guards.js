
export const guards = {

    guards: {},

    addGuard(event, callback) {
        if(!this.guards[event]) this.guards[event] = new Map();
        const id = crypto.randomUUID();
        this.guards[event].set(id, callback);
        return id;
    },
    
    // remove guard
    removeGuard(id){
        for(const event of Object.keys(this.guards)){
            if(this.guards[event].has(id)){
                this.guards[event].delete(id);
                return true;
            }
        }
        return false;
    },

    runGuards(event, to, from) {
        for (const guard of this.guards[event] || []) {
            const result = this.executeGuard(guard, to, from);
            
            // If guard returns false or redirect, stop execution
            if (result !== true) return result;
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