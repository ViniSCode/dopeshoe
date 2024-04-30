import { Select } from "@radix-ui/themes";

interface SelectQuantityProps {
  defaultQuantity: string;
  handleUpdateAmount: any;
  item: any;
}

export function SelectQuantity({
  defaultQuantity,
  item,
  handleUpdateAmount,
}: SelectQuantityProps) {
  const availableOptions = Array.from(
    { length: Math.min(item.available, 10) },
    (_, i) => i + 1
  );

  return (
    <Select.Root
      defaultValue={defaultQuantity.toString()}
      onValueChange={(value) => {
        if (item.available > item.amount && Number(value) <= 10) {
          handleUpdateAmount(item, Number(value), "select");
        }
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group className="text-[#707072] font-medium">
          <Select.Label>Select Quantity</Select.Label>
          {availableOptions.map((option) => (
            <Select.Item key={option.toString()} value={option.toString()}>
              {option}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
