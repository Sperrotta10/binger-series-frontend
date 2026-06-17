import { List } from 'lucide-react';
import type { UserList } from '../../types/profile';

interface ProfileListsTabProps {
  lists: UserList[];
}

export function ProfileListsTab({ lists }: ProfileListsTabProps) {
  return (
    <div className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <List className="w-5 h-5 text-[#DCB8FF]" />
          <h2 className="text-[20px] font-bold tracking-tight text-on-surface">My Lists</h2>
        </div>
        <button className="text-[13px] font-semibold text-on-surface-variant hover:text-[#DCB8FF] transition-colors">
          + New List
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {lists.map((list) => (
          <div
            key={list.id}
            className="group relative bg-surface-container hover:bg-surface-container-high transition-colors rounded-2xl border border-white/5 overflow-hidden cursor-pointer"
          >
            {/* Stacked poster previews */}
            <div className="relative h-[120px] bg-surface-container-high overflow-hidden">
              {list.previewPosters.slice(0, 3).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt=""
                  className="absolute top-0 object-cover h-full w-[38%] rounded-r-lg border-r-2 border-[#121317] transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{
                    left: `${i * 30}%`,
                    zIndex: i,
                    opacity: 1 - i * 0.15,
                    filter: i > 0 ? `brightness(${1 - i * 0.18})` : undefined,
                  }}
                />
              ))}
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1F1F24] z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F24] via-transparent to-transparent z-10" />

              {/* Item count badge */}
              <div className="absolute top-sm right-sm z-20 flex items-center gap-[4px] px-[8px] py-[3px] rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-on-surface">{list.itemCount}</span>
                <span className="text-[10px] text-on-surface-variant">shows</span>
              </div>
            </div>

            {/* Meta */}
            <div className="p-md flex flex-col gap-[4px]">
              <h3 className="text-[15px] font-bold text-on-surface group-hover:text-[#DCB8FF] transition-colors leading-tight">
                {list.title}
              </h3>
              <p className="text-[12px] text-on-surface-variant leading-relaxed line-clamp-2">
                {list.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
