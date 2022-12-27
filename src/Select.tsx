import styles from "./select.module.css";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOptions[];
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
};

export function Select({ value, onChange, options }: SelectProps) {
  return (
    <div className={styles.container}>
      <select>
        <option>First</option>
        <option>Second</option>
        <option>Third</option>
        <option>Fourth</option>
      </select>
    </div>
  );
}
