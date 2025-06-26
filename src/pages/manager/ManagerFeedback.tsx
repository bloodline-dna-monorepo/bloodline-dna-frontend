import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiThumbsUp } from "react-icons/fi";
import axios from "axios";
import ManaSidebar from "components/ManagerSidebar/ManaSidebar";

const statusColor = (status: string) => {
  switch (status) {
    case "Chưa xử lý":
      return "bg-yellow-100 text-yellow-700";
    case "Đã xử lý":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function ManagerFeedback() {
  const [stats, setStats] = useState<any>({
    total: 0,
    avg: 0,
    pending: 0,
    satisfied: 0,
    ratingDist: [0, 0, 0, 0, 0],
    category: [],
  });
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [category, setCategory] = useState("Tất cả danh mục");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [expanded, setExpanded] = useState<number | null>(null);

  // Modal phản hồi
  const [replying, setReplying] = useState<any | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [sending, setSending] = useState(false);

  // Lấy dữ liệu từ API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, feedbackRes] = await Promise.all([
        axios.get("/api/manager/feedback/stats"),
        axios.get("/api/manager/feedback/list"),
      ]);
      setStats(statsRes.data);
      setFeedbacks(feedbackRes.data);
      setLastUpdate(new Date());
    } catch (e) {
      setStats({
        total: 0,
        avg: 0,
        pending: 0,
        satisfied: 0,
        ratingDist: [0, 0, 0, 0, 0],
        category: [],
      });
      setFeedbacks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lọc feedback
  const filteredFeedbacks = feedbacks.filter((f) => {
    const matchCategory =
      category === "Tất cả danh mục" || f.category === category;
    const matchStatus =
      status === "Tất cả trạng thái" || f.status === status;
    return matchCategory && matchStatus;
  });

  // Gửi phản hồi
  const handleSendReply = async () => {
    if (!replyContent.trim()) return;
    setSending(true);
    try {
      await axios.post(`/api/manager/feedback/${replying.id}/reply`, {
        reply: replyContent,
      });
      setFeedbacks((prev) =>
        prev.map((item) =>
          item.id === replying.id
            ? { ...item, reply: replyContent, status: "Đã xử lý" }
            : item
        )
      );
      setReplying(null);
      setReplyContent("");
    } catch (e) {
      alert("Gửi phản hồi thất bại!");
    }
    setSending(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <ManaSidebar />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold">Phản hồi</h1>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          Last updated: {lastUpdate.toLocaleTimeString()} {lastUpdate.toLocaleDateString()}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
          <div className="text-gray-500 text-xs">Tổng phản hồi</div>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-xs text-gray-400">Trong tháng này</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
          <div className="text-gray-500 text-xs">Đánh giá Trung Bình</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{stats.avg?.toFixed(1) || 0}/5</span>
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.round(stats.avg) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                  <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" />
                </svg>
              ))}
            </span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
          <div className="text-gray-500 text-xs">Chưa phản hồi</div>
          <div className="text-2xl font-bold">{stats.pending}</div>
          <div className="text-xs text-gray-400">Cần xử lý</div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border flex flex-col gap-2">
          <div className="text-gray-500 text-xs">Tỷ lệ hài lòng</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{stats.satisfied}%</span>
            <FiThumbsUp className="text-green-500" size={22} />
          </div>
          <div className="text-xs text-gray-400">Đánh giá 4-5 sao</div>
        </div>
      </div>
      {/* Phân bố đánh giá & Phân loại phản hồi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-lg shadow border">
          <div className="font-semibold mb-3">Phân bố đánh giá</div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-8">{star} <span className="text-yellow-400">★</span></span>
                <div className="flex-1 bg-gray-100 rounded h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded"
                    style={{
                      width: stats.total
                        ? `${(stats.ratingDist?.[5 - star] / stats.total) * 100}%`
                        : "0%",
                    }}
                  ></div>
                </div>
                <span className="w-6 text-right">{stats.ratingDist?.[5 - star] || 0}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow border">
          <div className="font-semibold mb-3">Phân loại phản hồi</div>
          <div className="space-y-2">
            {(stats.category || []).map((cat: any) => (
              <div key={cat.name} className="flex justify-between">
                <span>{cat.name}</span>
                <span className="font-semibold">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Danh sách phản hồi */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <div className="font-semibold text-lg mb-4">Danh sách phản hồi</div>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <select
            className="border rounded px-3 py-2 text-sm w-48"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option>Tất cả danh mục</option>
            {(stats.category || []).map((cat: any) => (
              <option key={cat.name}>{cat.name}</option>
            ))}
          </select>
          <select
            className="border rounded px-3 py-2 text-sm w-48"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option>Tất cả trạng thái</option>
            <option>Chưa xử lý</option>
            <option>Đã xử lý</option>
          </select>
        </div>
        {loading ? (
          <div className="py-10 text-center text-gray-400">Đang tải dữ liệu...</div>
        ) : (
          <div className="space-y-2">
            {filteredFeedbacks.map((fb, idx) => (
              <div
                key={fb.id || idx}
                className="border rounded-lg bg-gray-50"
              >
                <div className="flex items-center px-4 py-3 cursor-pointer" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                  <span className="font-semibold">{fb.user}</span>
                  <span className="text-xs text-gray-400 ml-2">{fb.date}</span>
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${statusColor(fb.status)}`}>{fb.status}</span>
                  <span className="text-xs px-2 py-1 rounded bg-gray-200 ml-2">{fb.category}</span>
                  <span className="ml-auto flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < fb.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                        <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" />
                      </svg>
                    ))}
                  </span>
                  <span className="ml-2">
                    {expanded === idx ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
                {expanded === idx && (
                  <div className="px-6 pb-4">
                    <div className="mb-2">{fb.content}</div>
                    {fb.reply && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mb-2 text-sm">
                        <div className="font-semibold mb-1">Phản hồi từ hệ thống:</div>
                        <div>{fb.reply}</div>
                      </div>
                    )}
                    <button
                      className="border px-3 py-1 rounded text-xs font-semibold hover:bg-gray-100"
                      onClick={() => {
                        setReplying(fb);
                        setReplyContent(fb.reply || "");
                      }}
                    >
                      Phản hồi
                    </button>
                  </div>
                )}
              </div>
            ))}
            {filteredFeedbacks.length === 0 && (
              <div className="text-center text-gray-400 py-8">Không có phản hồi phù hợp.</div>
            )}
          </div>
        )}
      </div>

      {/* Modal phản hồi */}
      {replying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="bg-white rounded-xl shadow-xl border p-8 w-full max-w-2xl relative animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
              onClick={() => setReplying(null)}
              aria-label="Đóng"
            >
              ×
            </button>
            <div className="font-bold text-xl mb-2">Phản hồi khách hàng</div>
            <div className="text-gray-500 text-sm mb-4">
              Phản hồi cho phản hồi của {replying.user}
            </div>
            <div className="bg-gray-50 rounded p-4 mb-4">
              <div className="font-semibold flex items-center gap-2">
                {replying.user}
                <span className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < replying.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                      <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.09 10,15.27 4.82,18.09 6,12.26 1.49,8.09 7.41,7.36" />
                    </svg>
                  ))}
                </span>
              </div>
              <div className="mt-2">{replying.content}</div>
            </div>
            <div className="mb-2 font-semibold">Nội dung phản hồi</div>
            <textarea
              className="border rounded px-3 py-2 w-full min-h-[100px]"
              placeholder="Nhập nội dung phản hồi cho khách hàng..."
              value={replyContent}
              onChange={e => setReplyContent(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="border px-5 py-2 rounded font-semibold hover:bg-gray-100"
                onClick={() => setReplying(null)}
                disabled={sending}
              >
                Hủy
              </button>
              <button
                className="bg-black text-white px-5 py-2 rounded font-semibold hover:bg-gray-900 flex items-center gap-2"
                onClick={handleSendReply}
                disabled={sending || !replyContent.trim()}
              >
                ↩ Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}