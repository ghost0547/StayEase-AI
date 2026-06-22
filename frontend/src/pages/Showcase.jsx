import { useState } from "react";

import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "../components/ui";

function Showcase() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        UI Components Showcase
      </h1>

      {/* Button Variants */}
      <div className="mb-4">
        <Button variant="primary">
          Primary Button
        </Button>
      </div>

      <div className="mb-4">
        <Button variant="secondary">
          Secondary Button
        </Button>
      </div>

      <div className="mb-4">
        <Button variant="outline">
          Outline Button
        </Button>
      </div>

      {/* Button Sizes */}
      <div className="mb-6">
        <Button size="sm">Small</Button>{" "}
        <Button size="md">Medium</Button>{" "}
        <Button size="lg">Large</Button>
      </div>

      {/* Input */}
      <div className="mt-4">
        <Input
          label="Name"
          placeholder="Enter your name"
        />
      </div>

      {/* Modal */}
      <div className="mt-4">
        <Button onClick={() => setOpen(true)}>
          Open Modal
        </Button>
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Demo Modal"
      >
        Modal content here
      </Modal>

      {/* Toast */}
      <div className="mt-4">
        <Toast message="Success Notification" />
      </div>

      {/* Loader */}
      <div className="mt-4">
        <Loader />
      </div>
    </div>
  );
}

export default Showcase;