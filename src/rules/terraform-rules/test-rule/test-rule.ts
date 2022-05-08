export const testRule = {
    create(_context: any) {
      return {
        Identifier(node: any) {
         // _context.report(node, 'This is unexpected!');
        }
      };
    },
  }
;

