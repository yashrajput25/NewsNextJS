
export default function ArchiveLayout({ archive, latest }) {

    return <div>
        <h1> News Archive </h1>
        {archive}
        {latest}
    </div>
}