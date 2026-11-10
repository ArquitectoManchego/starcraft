import bpy
import math
import os

MODELS_DIR = r"c:\PROYECTOS ANTIGRAVITY\GAME ASSETS\starcraft\public\models"

def make_gold_material():
    mat = bpy.data.materials.new(name="Protoss_Gold")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (0.85, 0.65, 0.15, 1.0)
        bsdf.inputs["Metallic"].default_value = 0.95
        bsdf.inputs["Roughness"].default_value = 0.22
    return mat

def make_crystal_material():
    mat = bpy.data.materials.new(name="Khaydarin_Blue")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (0.1, 0.7, 1.0, 1.0)
        bsdf.inputs["Roughness"].default_value = 0.1
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (0.15, 0.85, 1.0, 1.0)
            bsdf.inputs["Emission Strength"].default_value = 4.0
    return mat

def make_psiblade_material():
    mat = bpy.data.materials.new(name="Psi_Blade_Cyan")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (0.0, 0.9, 1.0, 1.0)
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = (0.0, 0.95, 1.0, 1.0)
            bsdf.inputs["Emission Strength"].default_value = 6.0
    return mat

# ==========================================
# 1. BUILD PYLON (pylon.glb)
# ==========================================
bpy.ops.wm.read_factory_settings(use_empty=True)
mat_gold = make_gold_material()
mat_cryst = make_crystal_material()

# Base pedestal
bpy.ops.mesh.primitive_cylinder_add(radius=1.8, depth=0.35, vertices=32, location=(0, 0, 0.17))
base = bpy.context.active_object
base.data.materials.append(mat_gold)

# 4 curved pylons / outer petals
for i in range(4):
    ang = i * (math.pi / 2)
    bpy.ops.mesh.primitive_cone_add(radius1=0.42, radius2=0.08, depth=2.4, vertices=6)
    p = bpy.context.active_object
    p.location = (math.cos(ang) * 1.35, math.sin(ang) * 1.35, 1.25)
    p.rotation_euler = (-math.sin(ang) * 0.22, math.cos(ang) * 0.22, ang)
    p.data.materials.append(mat_gold)

# Floating Khaydarin Crystal
bpy.ops.mesh.primitive_cylinder_add(radius=0.85, depth=2.2, vertices=8, location=(0, 0, 2.5))
crystal = bpy.context.active_object
crystal.scale = (1.0, 1.0, 1.2)
crystal.data.materials.append(mat_cryst)

pylon_path = os.path.join(MODELS_DIR, "pylon.glb")
bpy.ops.export_scene.gltf(filepath=pylon_path, export_format="GLB")
print(f"Exported {pylon_path}")

# ==========================================
# 2. BUILD PROTOSS PHOTON CANNON (photon-cannon.glb)
# ==========================================
bpy.ops.wm.read_factory_settings(use_empty=True)
mat_gold = make_gold_material()
mat_cryst = make_crystal_material()

# Golden platform
bpy.ops.mesh.primitive_cylinder_add(radius=2.0, depth=0.4, vertices=32, location=(0, 0, 0.2))
base = bpy.context.active_object
base.data.materials.append(mat_gold)

# Floating rotating outer ring
bpy.ops.mesh.primitive_torus_add(major_radius=1.5, minor_radius=0.15, location=(0, 0, 1.8))
ring = bpy.context.active_object
ring.data.materials.append(mat_gold)

# Central plasma orb / crystal
bpy.ops.mesh.primitive_uv_sphere_add(radius=0.8, segments=24, ring_count=24, location=(0, 0, 1.8))
orb = bpy.context.active_object
orb.data.materials.append(mat_cryst)

# 3 focusing emitters
for i in range(3):
    ang = i * (2 * math.pi / 3)
    bpy.ops.mesh.primitive_cone_add(radius1=0.25, radius2=0.04, depth=1.2, vertices=6)
    emitter = bpy.context.active_object
    emitter.location = (math.cos(ang) * 1.2, math.sin(ang) * 1.2, 1.8)
    emitter.rotation_euler = (0, math.pi / 2, ang)
    emitter.data.materials.append(mat_gold)

cannon_path = os.path.join(MODELS_DIR, "photon-cannon.glb")
bpy.ops.export_scene.gltf(filepath=cannon_path, export_format="GLB")
print(f"Exported {cannon_path}")

# ==========================================
# 3. BUILD PROTOSS ZEALOT WARRIOR (zealot.glb)
# ==========================================
bpy.ops.wm.read_factory_settings(use_empty=True)
mat_gold = make_gold_material()
mat_blade = make_psiblade_material()

# Torso / Armor Breastplate
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 0, 1.8))
torso = bpy.context.active_object
torso.scale = (0.7, 0.45, 0.8)
torso.data.materials.append(mat_gold)

# Head crest
bpy.ops.mesh.primitive_cone_add(radius1=0.35, depth=0.8, vertices=8, location=(0, 0, 2.65))
head = bpy.context.active_object
head.rotation_euler = (-0.3, 0, 0)
head.data.materials.append(mat_gold)

# Heavy Pauldrons (Shoulders)
for s in [-1, 1]:
    bpy.ops.mesh.primitive_cone_add(radius1=0.35, depth=0.7, vertices=6, location=(s * 0.65, 0, 2.2))
    p = bpy.context.active_object
    p.rotation_euler = (0, s * 0.4, 0)
    p.data.materials.append(mat_gold)

# Arms with Forearm Bracers
for s in [-1, 1]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.14, depth=1.0, vertices=12, location=(s * 0.75, 0.3, 1.6))
    arm = bpy.context.active_object
    arm.rotation_euler = (0.5, 0, s * 0.2)
    arm.data.materials.append(mat_gold)

    # PSI-BLADES (Glowing Energy Blades extended from wrists)
    bpy.ops.mesh.primitive_cone_add(radius1=0.18, depth=1.6, vertices=4, location=(s * 0.85, 0.9, 1.3))
    blade = bpy.context.active_object
    blade.rotation_euler = (math.pi / 2 + 0.3, 0, s * 0.15)
    blade.data.materials.append(mat_blade)

# Legs with armored greaves
for s in [-1, 1]:
    bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=1.4, vertices=12, location=(s * 0.35, 0, 0.7))
    leg = bpy.context.active_object
    leg.data.materials.append(mat_gold)

zealot_path = os.path.join(MODELS_DIR, "zealot.glb")
bpy.ops.export_scene.gltf(filepath=zealot_path, export_format="GLB")
print(f"Exported {zealot_path}")
