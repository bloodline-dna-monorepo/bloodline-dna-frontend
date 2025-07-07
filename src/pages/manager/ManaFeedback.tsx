import React, { useEffect, useState } from "react";
import { StarFilled, StarOutlined, MessageFilled } from "@ant-design/icons";
import axios from "axios";
import DashboardSidebar from "../../components/Common/Sidebar";
import type { Feedback } from "utils/types";

const ManaFeedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [total, setTotal] = useState(0);
  const [distribution, setDistribution] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    axios.get("/api/feedbacks").then((res) => {
      const data: Feedback[] = res.data || [];
      setFeedbacks(data);

      if (data.length) {
        const avg = data.reduce((sum, f) => sum + f.RatingFeedback, 0) / data.length;
        setAvgRating(Number(avg.toFixed(1)));
        setTotal(data.length);

        const dist = [0, 0, 0, 0, 0];
        data.forEach((f) => {
          if (f.RatingFeedback >= 1 && f.RatingFeedback <= 5) dist[f.RatingFeedback - 1]++;
        });
        setDistribution(dist.reverse());
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 py-10 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <h1 className="font-bold text-3xl mb-8">Xem phản hồi</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Đánh giá trung bình & tổng phản hồi */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Đánh giá Trung Bình</div>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{avgRating}/5</span>
                    <span className="flex">
                      {[1, 2, 3, 4, 5].map((i) =>
                        i <= Math.round(avgRating) ? (
                          <StarFilled key={i} className="text-yellow-400" />
                        ) : (
                          <StarOutlined key={i} className="text-yellow-400" />
                        )
                      )}
                    </span>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-600 rounded-full p-2">
                  <StarFilled />
                </span>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm mb-1">Tổng phản hồi</div>
                  <div className="text-2xl font-bold">{total}</div>
                  <div className="text-xs text-gray-400">Trong tháng này</div>
                </div>
                <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <MessageFilled />
                </span>
              </div>
            </div>
            {/* Phân bổ đánh giá */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold mb-2 text-lg">Phân bổ đánh giá</div>
                <div className="text-gray-500 text-xs mb-4">Thống kê theo số sao đánh giá</div>
                <div>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mb-2">
                      <span className="w-6 flex items-center">
                        <span className="text-yellow-400">
                          <StarFilled />
                        </span>
                        <span className="ml-1">{star}</span>
                      </span>
                      <div className="flex-1 mx-2 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-black rounded"
                          style={{
                            width:
                              total > 0
                                ? `${(distribution[5 - star] / total) * 100}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                      <span className="w-4 text-xs text-gray-500">{distribution[5 - star]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Danh sách phản hồi */}
          <div className="bg-white rounded-xl shadow p-8">
            <div className="font-semibold text-lg mb-1">Danh sách phản hồi</div>
            <div className="text-gray-500 text-sm mb-4">
              Quản lý và phản hồi ý kiến khách hàng
            </div>
            <div className="flex flex-col gap-4">
              {feedbacks.map((fb) => (
                <div
                  key={fb.FeedbackID}
                  className="border-l-4 border-blue-400 bg-gray-50 rounded p-4 flex flex-col md:flex-row md:items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{fb.CustomerFeedback}</div>
                    <div className="text-xs text-gray-400 mb-2">
                      {fb.DateFeedback}
                    </div>
                    <div className="text-gray-700">{fb.CommentFeedback}</div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    {[1, 2, 3, 4, 5].map((i) =>
                      i <= fb.RatingFeedback ? (
                        <StarFilled key={i} className="text-yellow-400" />
                      ) : (
                        <StarOutlined key={i} className="text-yellow-400" />
                      )
                    )}
                  </div>
                </div>
              ))}
              {feedbacks.length === 0 && (
                <div className="text-center text-gray-400 py-8">Không có phản hồi nào.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManaFeedback;