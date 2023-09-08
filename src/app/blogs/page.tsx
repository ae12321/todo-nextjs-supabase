import RouterButton from '../components/router-botton'

export default function BlogPage() {
  return (
    <div className="m-10 text-center">
      <span className="text-lg">click a title on the left to view detail </span>
      <div className="flex justify-center">
        <RouterButton description="" />
      </div>
    </div>
  )
}
