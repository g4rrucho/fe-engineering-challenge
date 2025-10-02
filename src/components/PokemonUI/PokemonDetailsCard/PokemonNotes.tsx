import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { DialogDescription } from '@radix-ui/react-dialog';

type TPokemonNotesProps = {
  pokemonName: string;
  notes: string;
  onUpdateNotes: (notes: string) => void;
};

const PokemonNotes: React.FC<TPokemonNotesProps> = ({
  pokemonName,
  notes,
  onUpdateNotes,
}) => {
  const [editNotes, setEditNotes] = React.useState(notes || '');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSave = () => {
    onUpdateNotes(editNotes);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setEditNotes(notes || '');
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">My Notes</h3>
      <div className="rounded-lg bg-gray-50 p-3">
        {notes ? (
          <p className="text-sm text-gray-700">{notes}</p>
        ) : (
          <p className="text-sm text-gray-500 italic">No notes yet</p>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Edit Notes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">
              Edit Notes for {pokemonName}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <div className="space-y-4">
            <Textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Add your notes about this Pokémon..."
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Notes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PokemonNotes;
