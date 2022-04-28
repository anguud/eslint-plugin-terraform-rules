const testRule2 = { 
    "var-length": (_context: { report: (arg0: { id: { name: string | any[]; }; }, arg1: string) => void; }) => 
        ({ Profram: (_node: { id: { name: string | any[]; }; }) => 
            { 
                console.log("something")
                if(_node.id.name.length < 2){ 
                    _context.report(_node, 'Variable names should be longer than 1 character'); 
                } 
            } 
        }) 
    };

    export {testRule2}