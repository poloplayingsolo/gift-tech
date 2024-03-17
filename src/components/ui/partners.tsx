import { Separator } from "@radix-ui/react-separator"

export function Partners() {
  return (
    <div className="mt-10">
      <div className="">
        <div>
          <span>Powered by</span>
          <img className="inline ml-2" src="/icp.svg" />
        </div>
        <div className="mt-3">
          <span>Available on </span>
          <img className="inline ml-2" src="/polygon.svg" />
        </div>
      </div>
    </div>
  )
}