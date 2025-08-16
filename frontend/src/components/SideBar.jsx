function Sidebar() {
    return (
      <aside className="w-64 bg-gray-100 border-r p-4 overflow-y-auto">
        <h2 className="font-semibold mb-2">Friends</h2>
        <ul className="space-y-2">
          <li className="p-2 rounded hover:bg-gray-200">Alice</li>
          <li className="p-2 rounded hover:bg-gray-200">Bob</li>
          <li className="p-2 rounded hover:bg-gray-200">Charlie</li>
        </ul>
      </aside>
    );
}

export default Sidebar;