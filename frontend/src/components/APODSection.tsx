import React, { useState } from "react";
import { Calendar, ExternalLink, Info } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useAPOD } from "../hooks/useNasaApi";

const APODSection: React.FC = () => {
  //if no data for today, show yesterday's date by default
  const getDefaultDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(getDefaultDate());

  const {
    data: apodData,
    isLoading: loading,
    error,
    refetch,
  } = useAPOD(selectedDate);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  if (loading) {
    return <LoadingSpinner message="Loading Astronomy Picture of the Day..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error instanceof Error ? error.message : "An error occurred"}
        onRetry={() => refetch()}
      />
    );
  }

  if (!apodData) {
    return (
      <ErrorMessage message="No data available" onRetry={() => refetch()} />
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-slide-up">
      <div className="bg-slate-800/30 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {apodData.title}
              </h2>
              <p className="text-slate-300 flex items-center gap-2">
                <Calendar size={16} />
                {new Date(apodData.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                min="1995-06-16"
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-nebula-500 focus:border-transparent"
              />
              {apodData.hdurl && (
                <a
                  href={apodData.hdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-nebula-600 hover:bg-nebula-700 text-white rounded-lg transition-colors"
                >
                  <ExternalLink size={16} />
                  HD Version
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image/Video */}
            <div className="space-y-4">
              {apodData.media_type === "image" ? (
                <div className="relative group">
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full h-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ) : (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={apodData.url}
                    title={apodData.title}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}

              {apodData.copyright && (
                <p className="text-sm text-slate-400 text-center">
                  © {apodData.copyright}
                </p>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Info
                  className="text-cosmic-400 mt-1 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    About This Image
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {apodData.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APODSection;
