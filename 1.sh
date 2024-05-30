#!/bin/bash

# Start frpc in a tmux session

# Set the path to the frpc configuration file
CONFIG_FILE="/home/hychen11/frp_0.51.1_linux_amd64/frpc.ini"

# Set the path to the frpc executable
FRPC_EXECUTABLE="/home/hychen11/frp_0.51.1_linux_amd64/frpc"

# Start the tmux session and frpc
tmux new-session -d -s frpc_session "$FRPC_EXECUTABLE -c $CONFIG_FILE"

# Detach from the tmux session
tmux detach-client

echo "frpc started in a tmux session. Use 'tmux attach-session -t frpc_session' to reattach."

rogauracore initialize_keyboard
rogauracore brightness 3
rogauracore rainbow_cycle 1

