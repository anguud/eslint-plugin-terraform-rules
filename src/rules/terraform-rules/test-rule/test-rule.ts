

const testRule = {
    create(_context: any) {
      return {
        Identifier(node: any) {
          console.log(node);
          _context.report(node, 'This is unexpected!');
        }
      };
    },
  }

;

export {testRule}