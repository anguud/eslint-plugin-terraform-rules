export const testRule = {
    create(_context: any) {
      return {
        Identifier(node: any) {
          console.log(node.name);
          _context.report(node, 'This is unexpected!');
        }
      };
    },
  }
;

