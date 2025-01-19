import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const useAuth = () => {
  const isAuthenticated = true;
  return isAuthenticated;
};

function JoinGame() {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return (
      <Button>
        Login to play !<Gamepad2 />
      </Button>
    );
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Play now !<Gamepad2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wanna Play ?</DialogTitle>
          <DialogDescription>Enter the game code to join a game</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="game"
            defaultValue=""
            placeholder="Game code"
          />
        </div>
        <DialogFooter>
          <Button type="submit">Start Playing !</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinGame;