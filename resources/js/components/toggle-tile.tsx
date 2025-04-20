export default function ToggleTile({text, toggle, aspect}: {text: string, toggle: boolean, aspect?: string}) {
     return (
          <div className={`${toggle ? 'border-green-400 bg-green-600/20' : 'border-sidebar-border'} transition select-none ${aspect ?? 'aspect-video'} border  rounded-xl text-sm text-center flex flex-col justify-center`}>
               {text}
          </div>
     )
}