export default function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 " +
        (props.className || "")
      }
    />
  );
}
