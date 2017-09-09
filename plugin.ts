import { AbstractPlugin } from "../../src/plugin-host/plugin/plugin";
import { PLUGIN_EVENT } from "../../src/plugin-host/plugin-events/plugin-event-types"
import { UserScoreChangedPluginEventArguments } from "../../src/plugin-host/plugin-events/event-arguments/user-score-changed-plugin-event-arguments";
import { PrePostMessagePluginEventArguments } from "../../src/plugin-host/plugin-events/event-arguments/pre-post-message-plugin-event-arguments";
import { LeaderboardResetPluginEventArguments } from "../../src/plugin-host/plugin-events/event-arguments/leaderboard-reset-plugin-event-arguments";
import { TimerTickPluginEventArguments } from "../../src/plugin-host/plugin-events/event-arguments/timer-tick-plugin-event-arguments";
import { CommandManager } from "./commandManager";

export class Plugin extends AbstractPlugin
{
  private readonly cmdManager: CommandManager = new CommandManager();

  constructor()
  {
    super("titles-plugin", "1.0.0", {});

    this.subscribeToPluginEvent(PLUGIN_EVENT.PLUGIN_EVENT_PRE_MESSAGE, (_data: PrePostMessagePluginEventArguments) =>
    {
      //Check if command /add_title is executed
      var command = "/add_title";
      if (_data.Message.length >= command.length && _data.Message.substr(0, command.length) == command) {
        return this.cmdManager.addTitle(_data.Message, 0);
      }
      
      //Check if command /modify_title is executed
      command = "/modify_title";
      if (_data.Message.length >= command.length && _data.Message.substr(0, command.length) == command) {
        return this.cmdManager.modifyTitle(_data.Message, 0);
      }

      //Check if command /titles is executed
      command = "/titles";
      if (_data.Message.length >= command.length && _data.Message.substr(0, command.length) == command) {
        return this.cmdManager.getTitles(0);
      }

      //Check if command /remove_title is executed
      command = "/remove_title";
      if (_data.Message.length >= command.length && _data.Message.substr(0, command.length) == command) {
        return this.cmdManager.removeTitle(_data.Message, 0);
      }
    });
  }
} 