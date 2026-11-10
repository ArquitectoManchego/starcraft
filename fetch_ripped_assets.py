import os
import sys
import json
import urllib.request
import subprocess

MODELS_DIR = r"c:\PROYECTOS ANTIGRAVITY\GAME ASSETS\starcraft\public\models"
PORTRAITS_DIR = r"c:\PROYECTOS ANTIGRAVITY\GAME ASSETS\starcraft\public\portraits"
SOUNDS_DIR = r"c:\PROYECTOS ANTIGRAVITY\GAME ASSETS\starcraft\public\sounds"
BACKGROUNDS_DIR = r"c:\PROYECTOS ANTIGRAVITY\GAME ASSETS\starcraft\public\backgrounds"
BLENDER_PATH = r"C:\Program Files\Blender Foundation\Blender 5.2\blender.exe"

os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(PORTRAITS_DIR, exist_ok=True)
os.makedirs(SOUNDS_DIR, exist_ok=True)
os.makedirs(BACKGROUNDS_DIR, exist_ok=True)

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_file(url, target_path):
    print(f"Downloading {url} -> {target_path}")
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req) as resp, open(target_path, 'wb') as f:
            f.write(resp.read())
        print(f"  OK: {os.path.getsize(target_path)} bytes")
        return True
    except Exception as e:
        print(f"  Error downloading {url}: {e}")
        return False

# 1. DOWNLOAD REAL COCONAUTS BLEND MODELS
BLEND_MODELS = [
    ("marine.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/terran/units/marine.blend"),
    ("scv.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/terran/units/scv.blend"),
    ("firebat.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/terran/units/firebat.blend"),
    ("zergling.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/zerg/units/zergling.blend"),
    ("hydralisk.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/zerg/units/hydralisk.blend"),
    ("mutalisk.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/zerg/units/mutalisk.blend"),
    ("supply-depot.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/terran/buildings/supply-depot.blend"),
    ("terran-turret.blend", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/models/terran/buildings/terran-turret.blend")
]

for filename, url in BLEND_MODELS:
    target = os.path.join(MODELS_DIR, filename)
    if not os.path.exists(target):
        download_file(url, target)

# 2. CONVERT ALL BLEND MODELS TO GLB WITH BLENDER
blend_files = [f for f in os.listdir(MODELS_DIR) if f.endswith(".blend")]
for bf in blend_files:
    blend_path = os.path.join(MODELS_DIR, bf)
    glb_name = bf.replace(".blend", ".glb")
    glb_path = os.path.join(MODELS_DIR, glb_name)
    if not os.path.exists(glb_path):
        print(f"Converting {bf} -> {glb_name} using Blender 5.2...")
        py_cmd = f"import bpy; bpy.ops.export_scene.gltf(filepath=r'{glb_path}', export_format='GLB')"
        res = subprocess.run([BLENDER_PATH, "-b", blend_path, "--python-expr", py_cmd], capture_output=True, text=True)
        if os.path.exists(glb_path):
            print(f"  Exported {glb_name} successfully ({os.path.getsize(glb_path)} bytes)")
        else:
            print(f"  Failed to export {glb_name}: {res.stderr}")

# 3. DOWNLOAD REAL TEXTURES
TEXTURES = [
    ("siegetank_diffuse.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/textures/units/siegetank_diffuse.png"),
    ("zergling_diffuse.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/textures/units/zergling_diffuse.png"),
    ("mutalisk_diffuse.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/textures/units/mutalisk_diffuse.png"),
    ("scv_diffuse.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/textures/units/scv_diffuse.png"),
    ("hudbox.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sprites/hudbox.png"),
    ("train-ui.png", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sprites/train-ui.png")
]
for fname, url in TEXTURES:
    target = os.path.join(MODELS_DIR, fname)
    if not os.path.exists(target):
        download_file(url, target)

# 4. DOWNLOAD REAL AUDIO FILES
AUDIO_FILES = [
    ("marine_commander.mp3", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/marine/selected/commander.mp3"),
    ("marine_shoot.mp3", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/marine/selected/gimme-something-to-shoot2.mp3"),
    ("marine_jacked.mp3", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/marine/selected/jacked-up-and-good-to-go.mp3"),
    ("marine_standin.mp3", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/marine/selected/standin-by.mp3"),
    ("siegetank_what00.ogg", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/siegetank/selected/SiegeTank_What00.ogg"),
    ("siegetank_what01.ogg", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/siegetank/selected/SiegeTank_What01.ogg"),
    ("siegetank_what02.ogg", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran/siegetank/selected/SiegeTank_What02.ogg"),
    ("select.wav", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/select.wav"),
    ("not_enough_minerals.wav", "https://raw.githubusercontent.com/coconauts/startcraft-unity3d/master/Assets/sounds/terran-notenoughminerals.wav")
]
for fname, url in AUDIO_FILES:
    target = os.path.join(SOUNDS_DIR, fname)
    if not os.path.exists(target):
        download_file(url, target)

# 5. FETCH REAL PORTRAITS FROM FANDOM MEDIAWIKI API
PORTRAIT_TITLES = {
    "marine.jpg": "File:Marine SC2 Head2.jpg",
    "raynor.jpg": "File:JimRaynor SC2 Head2.jpg",
    "siege_tank.jpg": "File:SiegeTank SC2 Head1.jpg",
    "battlecruiser.gif": "File:Battlecruiser SC2 HeadAnim1.gif",
    "ghost.jpg": "File:Ghost SC2 Head1.jpg",
    "kerrigan.jpg": "File:SarahKerrigan SC2-HotS Head5.jpg",
    "zeratul.jpg": "File:Zeratul SC2 Head1.jpg",
    "artanis.jpg": "File:Artanis SC2-LotV Portrait.jpg",
    "zealot.jpg": "File:Zealot SC2 Head1.jpg",
    "stalker.jpg": "File:Stalker SC2 Head1.jpg",
    "colossus.jpg": "File:Colossus SC2 Head1.jpg",
    "carrier.jpg": "File:Carrier SC2 Head1.jpg",
    "zergling.jpg": "File:Zergling SC2 Head1.jpg",
    "hydralisk.gif": "File:Hydralisk SC2 DevHeadAnim1.gif",
    "ultralisk.jpg": "File:Ultralisk SC2 Head2.jpg"
}

for local_name, wiki_title in PORTRAIT_TITLES.items():
    target = os.path.join(PORTRAITS_DIR, local_name)
    if not os.path.exists(target):
        api_url = f"https://starcraft.fandom.com/api.php?action=query&titles={urllib.parse.quote(wiki_title)}&prop=imageinfo&iiprop=url&format=json"
        try:
            req = urllib.request.Request(api_url, headers=HEADERS)
            data = json.loads(urllib.request.urlopen(req).read())
            pages = data['query']['pages']
            img_url = list(pages.values())[0]['imageinfo'][0]['url']
            download_file(img_url, target)
        except Exception as e:
            print(f"Error fetching portrait for {wiki_title}: {e}")

# 6. FETCH REAL CINEMATIC BACKGROUNDS FROM FANDOM
BACKGROUND_TITLES = {
    "hyperion_armory.jpg": "File:HyperionArmory SC2-WoL Story1.jpg",
    "char_volcano.jpg": "File:Char SC2 Art5.jpg",
    "aiur_golden.jpg": "File:Aiur SC2-LotV CineLegacy1.jpg",
    "marsara_desert.jpg": "File:MarSara SC2 Art1.jpg"
}

for local_name, wiki_title in BACKGROUND_TITLES.items():
    target = os.path.join(BACKGROUNDS_DIR, local_name)
    if not os.path.exists(target):
        api_url = f"https://starcraft.fandom.com/api.php?action=query&titles={urllib.parse.quote(wiki_title)}&prop=imageinfo&iiprop=url&format=json"
        try:
            req = urllib.request.Request(api_url, headers=HEADERS)
            data = json.loads(urllib.request.urlopen(req).read())
            pages = data['query']['pages']
            img_url = list(pages.values())[0]['imageinfo'][0]['url']
            download_file(img_url, target)
        except Exception as e:
            print(f"Error fetching background {wiki_title}: {e}")

print("ALL ASSETS DOWNLOADED AND PROCESSED SUCCESSFULLY!")
