import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const CustomForm = ({
  formcontrollers,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = (getControllerItem) => {
    let value = formData[getControllerItem.name] || "";
    switch (getControllerItem.componentType) {
      case "input":
        return (
          <Input
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            type={getControllerItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: e.target.value,
              })
            }
          />
        );
      case "select":
        return (
          <Select
            value={value}
            onValueChange={(e) =>
              setFormData({ ...formData, [getControllerItem.name]: e })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControllerItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControllerItem.options && getControllerItem.options.length > 0
                ? getControllerItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.value}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <Textarea
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: e.target.value,
              })
            }
          />
        );
      default:
        return (
          <Input
            name={getControllerItem.name}
            placeholder={getControllerItem.placeholder}
            id={getControllerItem.name}
            type={getControllerItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControllerItem.name]: e.target.value,
              })
            }
          />
        );
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formcontrollers.map((controller) => (
          <div className="grid w-full gap-1.5" key={controller.name}>
            <Label className="mb-1">{controller.label}</Label>
            {/* Render inputs based on component type */}
            {renderInputsByComponentType(controller)}
          </div>
        ))}
      </div>
      <Button className="mt-4 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CustomForm;
