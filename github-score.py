import requests
import json

# Replace YOUR_USERNAME with your GitHub username
username = "YOUR_USERNAME"
# Replace YOUR_ACCESS_TOKEN with your GitHub personal access token
access_token = "YOUR_ACCESS_TOKEN"


def get_github_contributions(username, access_token):
    url = f"https://api.github.com/users/{username}/events/public"
    headers = {"Authorization": f"token {access_token}"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        events = json.loads(response.text)
        contributions = {"PushEvent": 0, "PullRequestEvent": 0,
                         "IssueCommentEvent": 0, "CreateEvent": 0}

        for event in events:
            event_type = event["type"]
            if event_type in contributions:
                contributions[event_type] += 1
    else:
        print("Error fetching data:", response.status_code)
        return None

    return contributions


contributions = get_github_contributions(username, access_token)
if contributions:
    print("GitHub Contribution Activity for", username)
    print("----------------------------------")
    for event_type, count in contributions.items():
        print(f"{event_type}: {count}")
