export default function Models() {
  return (
    <div className="p-6 space-y-6">
      {/* 標題 & 按鈕區塊 */}
      <div className="flex items-center justify-between">
        {/* 標題區塊 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Manage Your Models
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View, edit, and manage your AI models efficiently.
          </p>
        </div>
        {/* 右側按鈕區塊 */}
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Add Model
          </button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Manage Versions
          </button>
        </div>
      </div>
      {/* 模型管理內容區塊 */}
      <section className="space-y-4">
        {/* 模型列表 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Model List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 預留未來實作的區域 */}
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              (Data Table Here)
            </div>
          </div>
        </div>

        {/* 版本控制 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Version Control
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 預留未來實作的區域 */}
            <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
              (Version Control Table Here)
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
