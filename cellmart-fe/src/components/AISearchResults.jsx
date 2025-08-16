import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCreateAISearchMutation } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function AISearchResults() {
  const searchValue = useSelector((state) => state.search.value);
  const [createAISearch, { data: searchResults, isLoading, isError }] = useCreateAISearchMutation();

  useEffect(() => {
    if (searchValue && searchValue.trim() !== "") {
      createAISearch({ query: searchValue });
    }
  }, [searchValue, createAISearch]);

  if (!searchValue || searchValue.trim() === "") {
    return null;
  }

  return (
    <>
      <section className="px-8 py-8 lg:py-8">
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="sparkle-animation">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#c98f65] to-[#f28e8e] flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold gentle-pulse">
              AI Search Results
            </h2>
          </div>
          <p className="text-lg text-muted-foreground subtle-float">
            Here are the phones that match your search: "{searchValue}"
          </p>
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative mb-6">
              <div className="animated-border"></div>
              <div className="glow-effect"></div>
              <div className="white-gradient"></div>
              <div className="border-gradient"></div>
              <div className="search-wrapper">
                <div className="text-black font-medium text-lg">AI is analyzing your request...</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 bg-[#c98f65] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#f28e8e] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[#c98f65] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        {isError && (
          <div className="text-center py-12">
            <div className="floating-icon mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto">
                <span className="text-red-500 text-2xl">⚠</span>
              </div>
            </div>
            <p className="text-lg text-red-500">
              Sorry, there was an error processing your search. Please try again.
            </p>
          </div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {searchResults.map((result, index) => (
              <div key={result.phone._id} className="result-card relative" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={result.phone} />
                <div className="absolute top-2 left-2 px-3 py-1.5 bg-gradient-to-r from-[#c98f65] to-[#f28e8e] rounded-full text-xs text-white font-semibold backdrop-blur-sm shadow-lg border border-white/20 z-10">
                  {Math.round(result.confidence * 100)}% match
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults && searchResults.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="floating-icon mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto">
                <span className="text-gray-500 text-2xl">📱</span>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              No phones found matching your search. Try explaining differently.
            </p>
          </div>
        )}
      </section>
    </>
  );
}