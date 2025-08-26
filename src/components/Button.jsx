export default function Button({ children, className='', ...props }){
  return <button className={'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ' + className} {...props}>{children}</button>
}
