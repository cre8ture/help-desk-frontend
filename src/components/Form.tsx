import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

const HelpDeskForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <Dialog.Root>
      <button>Open Help Desk Form</button>
      <Dialog.Content>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" required />
          </label>
          <label>
            Email
            <input type="email" required />
          </label>
          <label>
            Problem Description
            <textarea required />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button>Close</button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default HelpDeskForm;
