import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    type: "text",
    placeholder: "Digite algo...",
    value: "",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
    },
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    onChange: {
      action: "changed",
    },
    onBlur: {
      action: "blurred",
    },
    onFocus: {
      action: "focused",
    },
    onKeyDown: {
      action: "key down",
    },
    onKeyUp: {
      action: "key up",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithPlaceholder: Story = {
  args: {
    placeholder: "Digite seu nome...",
  },
};
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Digite sua senha...",
  },
};
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Digite seu email...",
  },
};
