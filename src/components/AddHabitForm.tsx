import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMOJI_OPTIONS = ["💪", "📚", "🧘", "💧", "🏃", "😴", "🥗", "✍️", "🎯", "🌅", "💊", "🧹"];

interface AddHabitFormProps {
  onAdd: (name: string, emoji: string) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), selectedEmoji);
      setName("");
      setSelectedEmoji(EMOJI_OPTIONS[0]);
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
      >
        <Plus className="h-5 w-5" />
        <span className="font-medium">Add new habit</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-lg p-4 shadow-soft fade-in"
    >
      <div className="space-y-4">
        {/* Emoji selector */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Choose an icon
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-2xl p-2 rounded-lg transition-all ${
                  selectedEmoji === emoji
                    ? "bg-primary/20 ring-2 ring-primary"
                    : "hover:bg-muted"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Name input */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">
            Habit name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Drink 8 glasses of water"
            className="bg-background"
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsOpen(false);
              setName("");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Add Habit
          </Button>
        </div>
      </div>
    </form>
  );
}
