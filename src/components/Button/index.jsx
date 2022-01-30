export default function Button({children, ...props}) {
  return <button className="py-2.5 px-5 relative rounded-sm bg-neutral-800 hover:bg-neutral-600 text-white inline-flex justify-center items-center text-center cursor-pointer" {...props}>{children}</button>
}